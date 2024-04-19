import { useEffect, useState } from "react";
import Card from "../../../components/profile/Card";
import { Button, TextInput } from "flowbite-react";
import Utils from "../../../utils/Utils";
import userService from "../../../api/userService";
import { toast } from "react-toastify";
import { AiOutlineLoading } from "react-icons/ai";
import { useAuth } from "../../../provider/AuthProvider";
import { useProgressBar } from "../../../provider/ProgressBarProvider";

export default function Profile() {
    const { user: userNotParsed, setUser, setAccessToken, setRefreshToken } = useAuth();
    const [user, setUserData] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { displayProgressBar } = useProgressBar();

    const fetchUpdateProfile = (name, email, avatar) => {
        setIsLoading(true);

        userService.update_profile(user.id, name, email, avatar, (statusCode, jsonRes) => {
            setIsEditMode(false);
            setIsLoading(false);

            if (200 === statusCode) {
                setUser(JSON.stringify(jsonRes));
                setUserData(jsonRes);
            } else if (401 === statusCode) {
                toast.error("Session expirée");
            } else {
                toast.error("Une erreur est survenue, veuillez réessayer plus tard");
            }
        })
    }

    const submitProfile = (event) => {
        setIsEditMode(true);

        const data = new FormData(event.currentTarget);
        event.preventDefault();

        // Update profile
        if (!Utils.isEmpty(data.get('name'), data.get('email'), data.get('avatar'))) {
            fetchUpdateProfile(data.get('name'), data.get('email'), data.get('avatar'));
        }
    }

    useEffect(() => {
        setTimeout(() => {
            displayProgressBar(false);
            setUserData(JSON.parse(userNotParsed));
        }, 250);
        // eslint-disable-next-line
    }, []);


    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 container mx-auto py-6">
            <div className="lg:col-span-1">
                <Card>
                    <form className="flex flex-col items-center" onSubmit={submitProfile} encType="multipart/form-data">
                        {isEditMode
                            ? <div className="flex flex-col gap-2 w-9/12">
                                {/* <div className="flex w-full items-center justify-center">
                                    <Label
                                        htmlFor="dropzone-file"
                                        className="flex h-26 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                    >
                                        <div className="flex justify-evenly">
                                            <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                                <svg
                                                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 20 16"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                    />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG or JPG</p>
                                            </div>
                                            {!Utils.isEmpty(imagePreview) && (<img className="w-1/4" src={imagePreview} alt="image preview" />)}
                                        </div>
                                        <FileInput onChange={previewFile} name="file" id="dropzone-file" className="hidden" />
                                    </Label>
                                </div> */}
                                <TextInput
                                    type="text"
                                    id="small"
                                    sizing="sm"
                                    placeholder="avatar"
                                    name="avatar"
                                    defaultValue={user.avatar}
                                />
                                <TextInput
                                    type="text"
                                    id="small"
                                    sizing="sm"
                                    placeholder="nom"
                                    name="name"
                                    defaultValue={user.name}
                                />
                                <TextInput
                                    type="email"
                                    id="small"
                                    sizing="sm"
                                    placeholder="email"
                                    name="email"
                                    defaultValue={user.email}
                                />
                                <TextInput
                                    type="email"
                                    id="small"
                                    sizing="sm"
                                    placeholder="email"
                                    name="email"
                                    disabled
                                    defaultValue={user.role}
                                />
                            </div>
                            : <>
                                {user?.avatar
                                    ? <img
                                        src={user.avatar}
                                        className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                                        alt="User"
                                    />
                                    : <div className="animate-pulse flex space-x-4 mb-4">
                                        <div className="rounded-full bg-gray-400 h-32 w-32"></div>
                                    </div>}
                                {user?.name ? <h1 className="text-xl font-bold">{user.name}</h1> : <div className="h-4 w-16 bg-gray-400 mb-3 rounded"></div>}
                                {user?.email ? <h1 className="text-md">{user.email}</h1> : <div className="h-4 w-40 bg-gray-400 rounded mb-3"></div>}
                                {user?.role ? <h1 className="text-gray-300">{user.role}</h1> : <div className="h-4 w-16 bg-gray-400 rounded"></div>}
                            </>
                        }
                        <div className="mt-6 flex flex-wrap gap-4 justify-center">
                            <Button
                                className="rounded border-transparent focus:border-transparent focus:ring-0"
                                type="submit"
                                isProcessing={isLoading}
                                processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />}
                            >
                                {isEditMode ? "Sauvegarder" : "Modifier"}
                            </Button>
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
                                onClick={() => {
                                    setUser();
                                    setAccessToken();
                                    setRefreshToken();
                                }}
                            >
                                Se déconnecter
                            </button>
                        </div>
                    </form>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <Card>
                    <h2 className="text-xl font-bold mb-4">About Me</h2>
                    <p className="text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus
                        est vitae tortor ullamcorper, ut vestibulum velit convallis. Aenean
                        posuere risus non velit egestas suscipit. Nunc finibus vel ante id
                        euismod. Vestibulum ante ipsum primis in faucibus orci luctus et
                        ultrices posuere cubilia Curae; Aliquam erat volutpat. Nulla vulputate
                        pharetra tellus, in luctus risus rhoncus id.
                    </p>
                    <h3 className="font-semibold text-center mt-3 -mb-2">Find me on</h3>
                    <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
                    {[...Array(3)].map((_, index) => (
                        <div className="mb-6" key={index}>
                            <div className="flex justify-between flex-wrap gap-2 w-full">
                                <span className="text-gray-700 font-bold">Web Developer</span>
                                <p>
                                    <span className="text-gray-700 mr-2">at ABC Company</span>
                                    <span className="text-gray-700">2017 - 2019</span>
                                </p>
                            </div>
                            <p className="mt-2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                finibus est vitae tortor ullamcorper, ut vestibulum velit
                                convallis. Aenean posuere risus non velit egestas suscipit.
                            </p>
                        </div>
                    ))}
                </Card>
            </div>
        </div>
    );
}
