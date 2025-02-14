import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail, AiOutlineUnlock } from 'react-icons/ai';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { login, register } from '../Actions/userActions';
import Metadata from '../Components/Metadata';
import 'react-toastify/dist/ReactToastify.css';
import { clearErrors } from '../Slice/ProductSlice';

const FormInput = ({ icon: Icon, type, value, onChange, placeholder, rightIcon: RightIcon }) => (
  <div className="relative rounded pl-3 border border-gray-500 py-1 flex items-center justify-around">
    <Icon className="text-gray-500" size={26} />
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full pl-4 py-1 pr-4 outline-none"
    />
     {RightIcon && (
      <div className="absolute right-3"> {/* Position absolutely and move from right edge */}
        <RightIcon />
      </div>
    )}
  </div>
);

const LoadingButton = () => (
  <div className="w-full cursor-pointer bg-blue-600 py-2 text-white font-medium rounded hover:bg-blue-500 flex justify-center items-center">
    <div role="status">
      <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

const SignUpLogin = () => {
  const { loading, isLogin } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formType, setFormType] = useState('Login');
  const [loginData, setLoginData] = useState({ email: '', password: '', passwordType: 'password' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    passwordType: 'password',
    avatarFile: null,
    avatarPreview: '/Images/avatar.png',
    avatarName: 'Select Profile Pic..'
  });

  const resetForms = () => {
    if (formType === 'Login') {
      setRegisterData({
        name: '',
        email: '',
        password: '',
        passwordType: 'password',
        avatarFile: null,
        avatarPreview: '/Images/avatar.png',
        avatarName: 'Select Profile Pic..'
      });
    } else {
      setLoginData({ email: '', password: '', passwordType: 'password' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formType === 'Login') {
      dispatch(login(loginData.email, loginData.password));
    } else {
      const formData = new FormData();
      formData.append('name', registerData.name);
      formData.append('email', registerData.email);
      formData.append('password', registerData.password);
      if (registerData.avatarFile) {
        formData.append('avatar', registerData.avatarFile);
      }
      dispatch(register(formData));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setRegisterData(prev => ({
            ...prev,
            avatarFile: file,
            avatarPreview: reader.result,
            avatarName: file.name
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLogin) {
    navigate('/');
  }
  useEffect(() => {
    return () => {
        dispatch(clearErrors());  // Clear errors when component unmounts
    };
}, [dispatch]);
  return (
    <>
      <Metadata title={formType} />
      <div className="min-h-screen bg-gray-100 pt-14 flex justify-center">
     
        <div className="pt-10 flex-col flex md:w-1/3 w-full md:px-0 px-4 pb-28 h-90 justify-center">
          <div className={`bg-white rounded-md shadow-md shadow-gray-400 w-full ${
            formType === 'Register' ? 'md:h-[80vh]' : 'md:h-[70vh]'
          }`}>
            <div className="flex justify-around">
              {['Login', 'Register'].map((type) => (
                <div
                  key={type}
                  onClick={() => {
                    setFormType(type);
                    resetForms();
                  }}
                  className={`text-center py-4 w-1/2 ${
                    formType === type ? 'border-x-0 border-t-0 border-blue-700 border-2' : 'border-none'
                  } text-xl cursor-pointer font-semibold hover:bg-gray-200`}
                >
                  {type}
                </div>
              ))}
            </div>

            <div className="pt-8">
              <form onSubmit={handleSubmit} className="flex flex-col pt-8 gap-5 px-8">
                {formType === 'Register' && (
                  <FormInput
                    icon={MdOutlineAccountCircle}
                    type="text"
                    value={registerData.name}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter Your Name"
                  />
                )}

                <FormInput
                  icon={AiOutlineMail}
                  type="email"
                  value={formType === 'Login' ? loginData.email : registerData.email}
                  onChange={(e) => {
                    const value = e.target.value;
                    formType === 'Login'
                      ? setLoginData(prev => ({ ...prev, email: value }))
                      : setRegisterData(prev => ({ ...prev, email: value }));
                  }}
                  placeholder="Enter Your Email"
                />

                <FormInput
                  icon={AiOutlineUnlock}
                  type={formType === 'Login' ? loginData.passwordType : registerData.passwordType}
                  value={formType === 'Login' ? loginData.password : registerData.password}
                  onChange={(e) => {
                    const value = e.target.value;
                    formType === 'Login'
                      ? setLoginData(prev => ({ ...prev, password: value }))
                      : setRegisterData(prev => ({ ...prev, password: value }));
                  }}
                  placeholder="Enter Your Password"
                  rightIcon={() => (
                    formType === 'Login' 
                      ? (loginData.passwordType === 'password' 
                        ? <AiOutlineEyeInvisible onClick={() => setLoginData(prev => ({ ...prev, passwordType: 'text' }))} size={26} className="cursor-pointer" />
                        : <AiOutlineEye onClick={() => setLoginData(prev => ({ ...prev, passwordType: 'password' }))} size={26} className="cursor-pointer" />)
                      : (registerData.passwordType === 'password'
                        ? <AiOutlineEyeInvisible onClick={() => setRegisterData(prev => ({ ...prev, passwordType: 'text' }))} size={26} className="cursor-pointer" />
                        : <AiOutlineEye onClick={() => setRegisterData(prev => ({ ...prev, passwordType: 'password' }))} size={26} className="cursor-pointer" />)
                  )}
                />

                {formType === 'Register' && (
                  <div className="relative pl-3 rounded hover:bg-gray-100 border border-gray-500 py-1 flex justify-around items-center">
                    <label htmlFor="fileinput" className="cursor-pointer w-full text-gray-500 flex justify-center items-center flex-wrap gap-4 py-1">
                      <img src={registerData.avatarPreview} className="w-6" alt="" />
                      {registerData.avatarName}
                    </label>
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="fileinput"
                    />
                  </div>
                )}

                {loading ? (
                  <LoadingButton />
                ) : (
                  <input
                    type="submit"
                    value={formType}
                    className="w-full cursor-pointer bg-blue-600 py-2 text-white font-medium hover:bg-blue-500 rounded"
                  />
                )}

                <p className="text-center">
                  {formType === 'Login' ? "Don't have account," : "Already have account,"}
                  <span
                    onClick={() => {
                      setFormType(formType === 'Login' ? 'Register' : 'Login');
                      resetForms();
                    }}
                    className="text-blue-800 underline font-semibold cursor-pointer"
                  >
                    {formType === 'Login' ? 'SignUp' : 'Login'}
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpLogin;





