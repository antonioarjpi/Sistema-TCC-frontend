import './styles.css'

function Footer(){
    return (
        <footer className='container'>
           
            <div className='container'>
                <p className="font-bold title-footer">Precisa de ajuda?</p>
                    <a type="button">Não tem o filme? Cadastre :)</a><br/>
                    <a href="#" className="font-footer">Central de ajuda</a><br/>
                    <a href="#" className="font-footer font-footer">Canais de atendimento</a><br/>  
                    <a href="#" className="font-footer ">Canais de atendimento</a><br/> 
                    <a href="#" className="font-footer">Ouvidoria</a><br/> 
                    
                </div>   
                
                <div className='container'>
                    <p className="font-bold title-footer">Fale comigo</p>
                    <a href="#" className="font-footer">Filmes ScoreXP</a><br/>
                    <a href="#" className="font-footer font-footer">Tel 86 99427-3871</a><br/>  
                    <a href="#" className="font-footer ">Email antonioarjpi@gmail.com</a><br/> 
                    <a href="#" className="font-footer">Ouvidoria</a><br/>
                    
                </div>
                  
                <div className='container'>    
                    <p className="font-bold title-footer">Minhas redes</p>
                    {/* <a className='fas fa fa-github' target={"_blank"} href="https://github.com/antonioarjpi"/> */}
                    <a className='fas fa fa-envelope-square' target={"_blank"} href="mailto:antonioarjpi@gmail.com?subject=Hello%20agin/"/>                 
                    <a className='fas fa fa-linkedin' target={"_blank"} href="https://www.linkedin.com/in/antonioarjpi/"/>                
                    <a className='fas fa fa-whatsapp' target={"_blank"} href="https://web.whatsapp.com/send?phone=5586994273871" />     
                </div>
        </footer>

    )
}

export default Footer;