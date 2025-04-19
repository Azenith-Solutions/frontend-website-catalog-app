import NavBarCatalog from '../../components/navBar/NavBarCatalog';
import ProductDetail from '../../components/ProductDetail/ProductDetail';
import Footer from '../../components/footer/Footer'

const ProductPage = () => {
    document.title = 'Component Page';

    const navItems = ['Componentes', 'Mais vendidos', 'Promoções', 'Novidades'];
    const description = "ARDUINO UNO R3 A Placa Arduino Uno R3 tem se tornado cada vez mais popular em aplicações de robótica e automação. Com essa placa de desenvolvimento é possível prototipar projetos de forma simples e didática.";

    return (
        <>
            <NavBarCatalog menuItems={navItems} redirectButtonName={"Serviços"} />
            <ProductDetail productName={"Nome do Produto"} price={"9999"} description={description} detailsList={["Placa de excelente qualidade.", "Micro-controlador Tmega328", "14 pinos de entrada/saída digital (dos quais 6 podem ser usados como saídas PWM)", "6 entradas analógicas", "Cristal oscilador de 16Mhz", "Uma conexão USB",
                "Uma entrada de alimentação (7 a 12V)", "Botão de reset", "Não Acompanha Cabo USB"]} />
            <Footer
            footerItems={navItems}
            />
        </>
    );
}

export default ProductPage;