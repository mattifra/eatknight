import NightLocator from './components/NightLocator.vue';
import Home from './components/Home.vue';
import Contacts from './components/Contacts.vue';
import Report from './components/Report.vue';


export const routes = [
    { path: '/', component: Home },
    { path: '/map', component: NightLocator },
    { path: '/contact', component: Contacts },
    { path: '/report', component: Report }

];