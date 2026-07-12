const UserProfile = () => {

    return (

        <div className="flex items-center gap-3">

            <img
                src="https://i.pravatar.cc/150"
                alt=""
                className="w-11 h-11 rounded-full"
            />

            <div>

                <h3 className="font-semibold">

                    Abhishek

                </h3>

                <p className="text-sm text-gray-500">

                    Developer

                </p>

            </div>

        </div>

    );

};

export default UserProfile;