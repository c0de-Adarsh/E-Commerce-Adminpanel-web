import { createSlice } from "@reduxjs/toolkit";



  const userSlice = createSlice({
      name:'user',
      initialState:{
        loading:false,
        isAuthenticated: false,
        user: null,
        error: null,
        isLogin: false,
        me: null,
        isUpdated: false ,
        allUsers: [],
        userDetails: {
            _id: "",
            name: "",
            email: "",
            password: "",
            avtar: [], 
            role: "",
            createdAt: "",
            __v: 0,
          } ,
        success: false,
      },
       
      reducers:{
        loginRequest:(state) =>{
            state.loading = true;
            state.isAuthenticated = false;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.isLogin = true;
            state.error = null;  // Reset error on success
          },
          loginFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
            state.wrongCredentialsErr = true;
          },
        registerRequest:(state) =>{
            state.loading = true;
            state.isAuthenticated = false
        },
        registerSuccess:(state,action)=>{
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.isLogin = true
        },
        registerFail:(state,action) =>{
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload
            state.userExistErr = true;
        },
        setIsLoginTrue:(state)=>{
            state.isLogin = true;
        },
        setIsLoginFalse:(state)=>{
            state.isLogin = false;
        },
        getMeRequest:(state) =>{
            state.loading = true;
            
        },
        getMeSuccess:(state,action)=>{
            state.loading = false;
            state.me = action.payload;
        },
        getMeFail:(state,action)=>{
            state.loading = false;
            state.error = action.payload
            state.me = null
        },
        updateProfileRequest:(state) =>{
            state.loading = true
        },
        updateProfileSuccess:(state)=>{
            state.loading = false;
            state.isUpdated = true
        },
        updateProfileFail:(state,action)=>{
            state.loading = false;
            state.error = action.payload
        },
        updateProfileRest:(state)=>{
            state.isUpdated = false
        },

        changePasswordRequest:(state)=>{
            state.loading = true;
        },
        changePasswordSuccess:(state)=>{
            state.loading = false;
            state.isUpdated = true; 
        },
        changePasswordFail:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        allUserRequest:(state)=>{
            state.loading = true;
        },
        allUserSuccess:(state,action)=>{
            state.loading = false;
            state.allUsers = action.payload
        },
        allUserFail:(state,action)=>{
            state.loading = false;
            state.error = action.payload
        },

        userDetailsRequest:(state)=>{
            state.loading = true;
        },
        userDetailsSuccess:(state,action)=>{
            state.loading = false;
            state.userDetails = action.payload;
        },
        userDetailsFail:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        userUpdatedRequest:(state)=>{
            state.loading = true;
        },
        userUpdatedSuccess:(state,action)=>{
            state.loading = false;
            state.success = action.payload.success; 
        },
        userUpdatedFail:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        userDeleteRequest:(state)=>{
            state.loading = true;
        },
        userDeleteSuccess:(state,action)=>{
            state.loading = false;
            state.success = true;
        },
        userDeleteFail:(state,action)=>{
            state.loading = false;
            state.error = action.payload
        },

        clearErrors: (state) => {
            state.error = null;
            state.wrongCredentialsErr = false;
            state.userExistErr = false;
          }
      }
  })

  export const {loginRequest , loginSuccess , loginFail , registerRequest , registerSuccess , registerFail,setIsLoginTrue,setIsLoginFalse , getMeRequest,getMeSuccess,getMeFail, updateProfileRequest,updateProfileSuccess,updateProfileFail,updateProfileRest,userDeleteRequest,userDeleteSuccess,userDeleteFail,userDetailsRequest,userDetailsSuccess,userDetailsFail,userUpdatedRequest,userUpdatedSuccess,userUpdatedFail,allUserRequest,allUserSuccess,allUserFail,changePasswordRequest, changePasswordSuccess,changePasswordFail} = userSlice.actions;

  export default userSlice.reducer