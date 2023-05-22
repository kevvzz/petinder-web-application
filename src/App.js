import React from 'react';
import MainPage from './Pages/Main Page/main.js';
import LguLogin from './component/Login/LGU_Login/lguLogin.js';
import AdminLogin from './component/Login/ADMIN_Login/adminLogin.js';
import LguRegisteredPet from './component/LGU Registered Pet/LguRegisteredPet.js';
import LguPetSeller from './component/LGU Pet Seller/LguPetSeller';
import LguPetOwner from './component/LGU Pet Owner/LguPetOwner';
import LguManageSettings from './component/LGU Manage Settings/LguManageSettings';
import LguLostPet from './component/LGU Lost Pet/LguLostPet';
import LguAnnouncement from './component/LGU Announcement/LguAnnouncement';
import AdminDashboard from './component/Dashboard/adminDashboard.js';
import AdminRegisteredPet from './component/Admin Registered Pet/adminRegisteredPet.js';
import AdminPetSeller from './component/Admin Pet Seller/adminPetSeller.js';
import AdminPetOwner from './component/Admin Pet Owner/adminPetOwner.js';
import AdminList from './component/Admin List/adminList.js';
import AdminLguList from './component/Admin Lgu List/adminLguList.js';
import AdminManageSettings from './component/Admin Manage Settings/adminManageSettings.js';
import PetProfileAdmin from './component/Admin Registered Pet/PetProfileAdmin.js';
import AddAdminPetOwner from './component/Admin Pet Owner/AdminOwnerProfile.js';
import AdminSellerProfile from './component/Admin Pet Seller/AdminSellerProfile.js';
import AdminLguProfile from './component/Admin Lgu List/adminLguProfile.js';
import LguPetProfile from './component/LGU Registered Pet/LguPetProfile.js';
import LguPetOwnerProfile from './component/LGU Pet Owner/LguPetOwnerProfile.js';
import LguPetSellerProfile from './component/LGU Pet Seller/LguPetSellerProfile.js';
import LguLostPetProfile from './component/LGU Lost Pet/LguLostPetProfile.js';
import ViewAnnouncement from './component/LGU Announcement/ViewAnnouncement.js';
import LguRequestTransfer from './component/LGU Request Transfer/LguRequestTransfer.js';
import LguNewTransfer from './component/LGU New Transfer/LguNewTransfer.js';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='/lgu-login' element={<LguLogin />}/>
        <Route path='/admin-login' element={<AdminLogin />}/>
        <Route path='/lgu-register' element={<LguRegisteredPet />}/>
        <Route path='/lgu-seller' element={<LguPetSeller />}/>
        <Route path='/lgu-owner' element={<LguPetOwner />}/>
        <Route path='/lgu-settings' element={<LguManageSettings />}/>
        <Route path='/lgu-lost' element={<LguLostPet/>}/>
        <Route path='/lgu-announcement' element={<LguAnnouncement />}/>
        <Route path='/admin-dashboard' element={<AdminDashboard />}/>
        <Route path='/admin-register' element={<AdminRegisteredPet />}/>
        <Route path='/admin-seller' element={<AdminPetSeller />}/>
        <Route path='/admin-owner' element={<AdminPetOwner />}/>
        <Route path='/admin-list' element={<AdminList />}/>
        <Route path='/admin-lgu-list' element={<AdminLguList />}/>
        <Route path='/admin-settings' element={<AdminManageSettings />}/>
        <Route path='/admin-pet-profile' element={<PetProfileAdmin/>}/>
        <Route path='/admin-owner-profile' element={<AddAdminPetOwner/>}/>
        <Route path='/admin-seller-profile' element={<AdminSellerProfile/>}/>
        <Route path='/admin-lgu-profile' element={<AdminLguProfile/>}/>
        <Route path='/lgu-pet-profile' element={<LguPetProfile/>}/>
        <Route path='/lgu-owner-profile' element={<LguPetOwnerProfile/>}/>
        <Route path='/lgu-seller-profile' element={<LguPetSellerProfile/>}/>
        <Route path='/lgu-lost-pet-profile' element={<LguLostPetProfile/>}/>
        <Route path='/lgu-view-announcement' element={<ViewAnnouncement/>}/>
        <Route path='/lgu-request' element={<LguRequestTransfer/>}/>
        <Route path='/lgu-transfer' element={<LguNewTransfer/>}/>
      </Routes>
    </Router>
  );
}

export default App;
