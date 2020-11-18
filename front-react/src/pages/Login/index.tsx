import React from 'react';

// import { Container } from './styles';

import './index.css';

const Login: React.FC = () => {
  return (
    <div className="container">
        <div className="container-form">
            <h2>Login</h2>
            <form action="" method="post" >
                <div className="input" id="input_usr_nome">
                    <label htmlFor="usr_nome">
                        Nome de usuário
                    </label>
                    <input type="text" name="usr_nome" placeholder="Joãozinho" id="usr_nome"/>
                </div>
                {/* <div className="input" id="input_usr_codigo">
                    <label htmlFor="usr_codigo">
                        AvatarURL
                    </label>
                    <input type="number" name="usr_codigo" placeholder="http://teste.com.br/png" id="usr_codigo"/>
                </div> */}
                <button type="submit" className="button-consultar-cliente" >
                    <h3>Entrar</h3>
                    <i  className="material-icons white">login</i>
                </button>
                {/* <!-- <button type="submit" className="button-consultar-cliente" onclick="gerarToast('error', 'Erro: asdfasdf')">
                    <h3>Testar erro</h3>
                    <i  className="material-icons white">login</i>
                </button> --> */}
            </form>
        </div>
    </div>
  );
}

export default Login;