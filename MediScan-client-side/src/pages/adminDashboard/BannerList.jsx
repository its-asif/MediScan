import { FaEdit, FaTrash } from "react-icons/fa";
import useAllBanners from "../../hooks/useAllBanners";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const BannerList = () => {
    const axiosSecure = useAxiosSecure();
    const [banners, refetch, bannersLoading] = useAllBanners();

    const handleBannerStatus = async (id) => {
        axiosSecure.patch(`/banners/active/${id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.activateResult.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position : "center",
                    icon : "success",
                    title: `Banner Status Updated`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
        .catch(err => console.log(err));
    }

    const handleDeletebanner = async (banner) => {
        
        const res = await axiosSecure.delete(`/banners/${banner._id}`);
        console.log(res.data);
        if(res.data.deletedCount > 0){
            refetch();
            Swal.fire({
                position : "center",
                icon : "success",
                title: `${banner.title} Deleted`,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    return (
        <div>
            <div className="my-4">
                <h2 className="text-3xl">Total Banners : {banners.length}</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Coupon Code</th>
                        <th>Discount Rate</th>
                        <th>Active Status</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* body */}
                    {
                        banners.map( (banner, index) => (
                            <tr key={banner._id}>
                                <th>{index + 1}</th>

                                <td>{banner.title}</td>
                                <td>{banner.coupon_code}</td>
                                <td>{banner.discount_rate}</td>
                                <td
                                    onClick={() => handleBannerStatus(banner._id)}
                                >
                                {
                                    banner.isActive ? 
                                    <button className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"> Active </button>
                                    : 
                                    <button className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"> Disabled </button>
                                }
                                </td>
                                <td ><button
                                    onClick={() => handleDeletebanner(banner)}
                                    ><FaTrash className='text-red-600'></FaTrash></button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};  

export default BannerList;