import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getOrders } from './services/orderService'; // Adjust the import based on your project structure

const getSeenOrders = () => {
  try {
    const stored = localStorage.getItem('previouslySeenOrders');
    console.log("Raw stored orders from localStorage:", stored);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error retrieving seen orders:", error);
    return [];
  }
};

const storeSeenOrders = (orderIds) => {
  try {
    console.log("Storing orders to localStorage:", orderIds);
    localStorage.setItem('previouslySeenOrders', JSON.stringify(orderIds));
  } catch (error) {
    console.error("Error storing seen orders:", error);
  }
};

function App() {
  const [notificationSound, setNotificationSound] = useState(true);

  useEffect(() => {
    const checkForNewOrders = async () => {
      console.log("Verificação periódica de pedidos...");
      try {
        console.log("Verificando novos pedidos...");
        const response = await getOrders(); // Your API call to get orders
        console.log("Resposta completa da API:", response);
        
        if (response.status === 200) {
          // Extract current order IDs
          const currentOrderIds = response.data.data.map(order => order.idPedido);
          console.log("IDs dos pedidos atuais extraídos:", currentOrderIds);
          
          // Get previously seen orders - force an empty array if null/undefined
          let previouslySeenOrders = getSeenOrders() || [];
          console.log("Pedidos anteriormente vistos (raw):", previouslySeenOrders);
          
          // Ensure previouslySeenOrders is an array
          if (!Array.isArray(previouslySeenOrders)) {
            console.warn("previouslySeenOrders não é um array, inicializando como array vazio");
            previouslySeenOrders = [];
          }
          
          console.log("Pedidos anteriores:", previouslySeenOrders);
          console.log("Pedidos atuais:", currentOrderIds);
          
          // Check if this is the first run (no previously seen orders)
          const isFirstRun = previouslySeenOrders.length === 0;
          
          if (isFirstRun) {
            console.log("Primeira execução, inicializando lista de pedidos anteriores");
            storeSeenOrders(currentOrderIds);
            return; // Skip notification on first run
          }
          
          // Find new orders (in current but not in previous)
          const newOrders = currentOrderIds.filter(id => !previouslySeenOrders.includes(id));
          console.log("Novos pedidos detectados:", newOrders);
          
          if (newOrders.length > 0) {
            // Find full order data for new orders
            const newOrdersData = response.data.data.filter(order => 
              newOrders.includes(order.idPedido)
            );
            
            console.log("Dados completos dos novos pedidos:", newOrdersData);
            
            // Show notifications for new orders
            newOrdersData.forEach(order => {
              toast.success(`Novo pedido #${order.idPedido} recebido!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
              
              // Play sound if enabled
              if (notificationSound) {
                try {
                  const audio = new Audio('/notification.mp3');
                  audio.play().catch(e => console.warn("Error playing notification sound:", e));
                } catch (error) {
                  console.error("Error with notification sound:", error);
                }
              }
            });
          }
          
          // Update stored orders with current list
          storeSeenOrders(currentOrderIds);
          console.log("Lista de pedidos anteriores atualizada no localStorage");
        }
      } catch (error) {
        console.error("Erro ao verificar pedidos:", error);
      }
    };
    
    // Run immediately on component mount
    checkForNewOrders();
    
    // Set up interval for periodic checks
    const intervalId = setInterval(checkForNewOrders, 30000); // Every 30 seconds
    
    // Clean up on unmount
    return () => {
      clearInterval(intervalId);
      console.log("Intervalo de verificação de pedidos limpo");
    };
  }, [notificationSound]); // Add other dependencies as needed

  return (
    <div>
      {/* Your existing components */}
      
      <ToastContainer />
    </div>
  );
}

export default App;