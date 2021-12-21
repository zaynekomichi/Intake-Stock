import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { personCircle,qrCode,scanOutline,fileTrayFullOutline } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Scan from './pages/scan';
import Login from './pages/login';
import ScanNew from './pages/scanNew';
import AddNew from './components/addnew';
import EditItem from './components/edititem';
import Withdraw from './components/withDrawItem';
import Take from './components/withDraw';
import Restock from './components/restockScan';
import Testing from './pages/test';
import How from './User/How';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Troubleshoot from './User/Troubleshoot';
import Security from './User/Security';
import Help from './User/Help';
import About from './User/About';
import Terms from './User/Terms';
import PStorage from './User/Storage';

const App: React.FC = () => (
  
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/scan">
            <Scan />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/scanNew">
          <ScanNew/>
          </Route>
          <Route exact path="/addnew">
            <AddNew />
          </Route>
          <Route exact path="/test">
            <Testing />
          </Route>
          <Route exact path="/withDrawItem">
            <Withdraw />
          </Route>
          <Route exact path="/restockScan">
            <Restock />
          </Route>
          <Route exact path="/edititem">
            <EditItem />
          </Route>
           <Route exact path="/withDraw">
            <Take />
          </Route>
          <Route exact path="/How" component={How}/>
          <Route exact path="/Troubleshoot" component={Troubleshoot}/>
          <Route exact path="/Security" component={Security}/>
          <Route exact path="/Help" component={Help}/>
          <Route exact path="/About" component={About}/>
          <Route exact path="/Terms" component={Terms}/>
          <Route exact path="/Storage" component={PStorage}/>
          <Route exact path="/">
            <Redirect to="/Login" />
          </Route>

        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={fileTrayFullOutline} />
            <IonLabel>Inventory</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={scanOutline} />
            <IonLabel>Scan</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={personCircle} />
            <IonLabel>User</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
