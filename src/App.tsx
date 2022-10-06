import "./App.css";
import { useMemo } from "react";

import Minter from "./Minter";

import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getMathWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { ThemeProvider, createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

const candyMachineId = process.env.REACT_APP_CANDY_MACHINE_ID
  ? new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID)
  : undefined;

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getSolletWallet(),
      getMathWallet(),
    ],
    []
  );

  function toggleMenu() {
    const menu = document.getElementById("mobileNavContainer")!;
    menu.classList.toggle("open-menu");
    console.log("pressed");
  }

  return (
    <div>
      <div id="mobileNavContainer" className="mobile-nav">
        <div className="mobile-nav-close-button">
          <img src="/icons/close.svg" alt="" onClick={toggleMenu} />
        </div>
        <ul>
          <li>
            <img className="mobile-nav-logo" src="/img/logo.png" alt="" />
          </li>
          <li>
            <a href="https://i.pinimg.com/564x/71/d6/30/71d630dd92af477fadb5cae67ea30576.jpg" onClick={toggleMenu}>
              hice
            </a>
          </li>
          <li>
            <a href="https://i.pinimg.com/564x/6c/57/48/6c5748a34b83c1450b6c305a7f5bdb2c.jpg" onClick={toggleMenu}>
              esto
            </a>
          </li>
          <li>
            <a href="https://i.pinimg.com/564x/77/ec/1f/77ec1f5d9801c2dc207c041669aea5b1.jpg" onClick={toggleMenu}>
              para
            </a>
          </li>
          <li>
            <a href="https://i.pinimg.com/564x/1e/63/8b/1e638b005f3ca088746522ca6e298dea.jpg" onClick={toggleMenu}>
              alegrarte
            </a>
          </li>
          <li>
            <div className="social-icons">
              <a href="https://www.youtube.com/watch?v=v4pi1LxuDHc&list=RDaXs3wFUcyzI&index=7" target="_blank" rel="noreferrer">
                <img className="nav-social" src="/icons/twitter.svg" alt="" />
              </a>
              <a href="https://www.youtube.com/watch?v=DqsMQJS5900" target="_blank" rel="noreferrer">
                <img className="nav-social" src="/icons/discord.svg" alt="" />
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div className="mobile-menu-button" onClick={toggleMenu}>
        <img src="/icons/menu.svg" alt="" />
      </div>
      <nav>
        <div className="nav-container">
          <img className="nav-logo" src="/img/logo.png" alt="" />
          <a className="hide-800" href="https://i.pinimg.com/564x/71/d6/30/71d630dd92af477fadb5cae67ea30576.jpg">
            hice
          </a>
          <a className="hide-800" href="https://i.pinimg.com/564x/6c/57/48/6c5748a34b83c1450b6c305a7f5bdb2c.jpg">
            esto
          </a>
          <a className="hide-800" href="https://i.pinimg.com/564x/77/ec/1f/77ec1f5d9801c2dc207c041669aea5b1.jpg">
            para
          </a>
          <a className="hide-800" href="https://i.pinimg.com/564x/1e/63/8b/1e638b005f3ca088746522ca6e298dea.jpg">
            alegrarte
          </a>
          <div className="social-icons hide-800">
            <a href="https://www.youtube.com/watch?v=v4pi1LxuDHc&list=RDaXs3wFUcyzI&index=7" target="_blank" rel="noreferrer">
              <img className="nav-social" src="/icons/twitter.svg" alt="" />
            </a>
            <a href="https://www.youtube.com/watch?v=DqsMQJS5900" target="_blank" rel="noreferrer">
              <img className="nav-social" src="/icons/discord.svg" alt="" />
            </a>
          </div>
        </div>
      </nav>
      <div className="content-wrapper">
        <header className="card" id="link1">
          <div style={{ padding: "0 24px 0 24px 0" }}>
            <h3 className="text-secondary-color">Bienvenido a</h3>
            <h1 className="pb-3">Mi millonesimo intento para que me pongas atención</h1>
            <p className="text-secondary-color">
              No creo mucho en el destino, pero no tengo que explicar la existencia de la causalidad. Y no sé alguien reciba
              mis agradecimientos, pero es la unica manera en la que puedo explicar lo que siento cuando te veo, cuando te siento, cuando te escucho,
              cuando te admiro en silencio. Lo complementada que me siento contigo, lo suave y tranquilo que es el mundo a tu lado. No puedo hacer otra
              cosa que agradecer porque estés vivo, porque tu corazonsito siga latiendo, tus pulmones llenandose de aire y tus neuronas construyendo la red
              que te hace ser tu.
            </p>
          </div>
          <div>
            <ThemeProvider theme={theme}>
              <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                  <WalletDialogProvider>
                    <Minter
                      candyMachineId={candyMachineId}
                      connection={connection}
                      startDate={startDateSeed}
                      txTimeout={txTimeout}
                      rpcHost={rpcHost}
                    />
                  </WalletDialogProvider>
                </WalletProvider>
              </ConnectionProvider>
            </ThemeProvider>
          </div>
        </header>

        <div id="link2" className="container">
          Soy libre, dentro de mi pequeño mundo soy libre; o al menos me gusta pensar que lo soy.
          Pero inevitablemente también soy tuya, me hice tuya en el momento en el que comencé a
          rezar silenciosamente por ti, por tu bienestar, en el momento en el que el cansancio le decía a mi cerebro
          que el lugar más tranquilo y placido que podriamos estar no es dentro de las cobijas sino acariciandote el rostro en un día de lluvia y viendote descansar a mi lado.
        </div>

        <div id="link3" className="container card">
          <h1 className="pb-3">Se supone que iba a hacer esto rapido para poder conectarme a ver Dark contigo, pero el codigo me presentaba fallos :c</h1>
        </div>

        <div id="link4" className="container faq">
          <h1 style={{ padding: "0 0 24px 0" }}>Se que me dices que no me preocupe por no contestarte, que no tengo ninguna obligación ni responsabilidad contigo, 
          pero lo que no te digo es que más allá de querer que sientas mi atención constante en tí (porque la tienes), es que es la única manera que tengo en este 
          momento de sentirme cerquita tuyo, y ojalá pudieras dimensionar la falta que me haces...</h1>

          <div>
            <h4>Estoy muy muy muy pero que muy orgullosa de tí</h4>
            <p>
              Solecito, estoy tan tremendamente feliz porque 
            </p>

            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
