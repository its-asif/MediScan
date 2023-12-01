import {
    createBrowserRouter,
} from "react-router-dom";
import '../index.css'
import Home from "../pages/home/Home";
import Main from "../layout/Main";
import AllTestPage from "../pages/others/AllTestPage";
import TestDetails from "../pages/others/TestDetails";
import Login from "../pages/authUser/Login";
import Register from "../pages/authUser/Register";
import Dashboard from "../layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import UserDashboard from "../pages/userDashboard/UserDashboard";
import AdminDashboard from "../pages/adminDashboard/AdminDashboard";
import MyProfile from "../pages/userDashboard/MyProfile";
import TestResults from "../pages/userDashboard/TestResults";
import UpcomingAppointments from "../pages/userDashboard/UpcomingAppointments";
import UserList from "../pages/adminDashboard/UserList";
import AddTest from "../pages/adminDashboard/AddTest";
import AddBanner from "../pages/adminDashboard/AddBanner";
import BannerList from "../pages/adminDashboard/BannerList";
import Reservations from "../pages/adminDashboard/Reservations";
import AllTests from "../pages/adminDashboard/AllTests";
import EditTest from "../pages/adminDashboard/EditTest";
import AdminRoutes from "./AdminRoutes";
import EditProfile from "../pages/userDashboard/EditProfile";
import HealthTipsBlog from "../pages/others/HealthTipsBlog";
import FAQPage from "../pages/others/FAQPage";
import Feedback from "../pages/others/Feedback";
import SymptomChecker from "../pages/others/SymptomChecker";

export const router = createBrowserRouter([
{
    path: "/",
    element: <Main></Main>,
    children: [
    {
        path: "/",
        element: <Home></Home>,
    },
    {
        path: '/allTestPage',
        element: <AllTestPage></AllTestPage>,
    },
    {
        path : '/testDetails/:id',
        element: <TestDetails></TestDetails>,
    },
    {
        path: "/login",
        element: <Login></Login>, 
    },
    {
        path: "/register",
        element: <Register></Register>, 
    },
    {   
        path: '/blogs',
        element: <HealthTipsBlog></HealthTipsBlog>,
    },
    {
        path: '/faq',
        element: <FAQPage></FAQPage>,
    },
    {
        path: "/feedback",
        element: <Feedback/>,
    },
    {
        path: "/symptomChecker",
        element: <SymptomChecker/>,
    },
    ],
},
{
    path: "/dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
    // General USER
    {
        path: "user",
        element: <UserDashboard></UserDashboard>,
    },
    {
        path: "profile",
        element: <MyProfile></MyProfile>,
    },
    {
        path: "editProfile",
        element: <EditProfile></EditProfile>,
    },
    {
        path: "testResult",
        element: <TestResults></TestResults>,
    },
    {
        path: "upcomingAppointments",
        element: <UpcomingAppointments></UpcomingAppointments>,
    },

    // ADMIN
    {
        path: "admin",
        element: <AdminRoutes><AdminDashboard></AdminDashboard></AdminRoutes>,
    },
    {
        path: "userlist",
        element: <AdminRoutes><UserList></UserList></AdminRoutes>,
    },
    {
        path: "addTest",
        element: <AdminRoutes><AddTest></AddTest></AdminRoutes>,
    },
    {
        path: "allTest",
        element: <AdminRoutes><AllTests></AllTests></AdminRoutes>,
    },
    {
        path: "addBanner",
        element: <AdminRoutes><AddBanner></AddBanner></AdminRoutes>,
    },
    {
        path: "bannerList",
        element: <AdminRoutes><BannerList></BannerList></AdminRoutes>,
    },
    {
        path: "reservations",
        element: <AdminRoutes><Reservations></Reservations></AdminRoutes>,
    },
    {
        path: "/dashboard/editTest/:id",
        element: <AdminRoutes><EditTest></EditTest></AdminRoutes>,
        loader : ({params}) => fetch(`https://medi-scan-server.vercel.app/tests/${params.id}`)
    }
    ],
}
]);

