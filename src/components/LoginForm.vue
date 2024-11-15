<template>
    <div class="fixed z-10 inset-0 overflow-y-auto hidden" id="modal" :class="hiddenClass">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
                <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
            </div>

            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

            <div
                class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <!-- Add margin if you want to see some of the overlay behind the modal-->
                <div class="py-4 text-left px-6">
                    <!--Title-->
                    <div class="flex justify-between items-center pb-4">
                        <p class="text-2xl font-bold">Your Account</p>
                        <!-- Modal Close Button -->
                        <div class="modal-close cursor-pointer z-50" @click-="modalVisibility = false">
                            <i class="fas fa-times"></i>
                        </div>
                    </div>

                    <!-- Tabs -->
                    <ul class="flex flex-wrap mb-4">
                        <li class="flex-auto text-center">
                            <a class="block rounded py-3 px-4 transition " :class="{
                                'hover:text-white text-white bg-blue-600': tab === 'login',
                                'hover:text-blue-600': tab === 'register'
                            }" href="#" @click.prevent="tab = 'login'">Login</a>
                        </li>
                        <li class="flex-auto text-center">
                            <a class="block rounded py-3 px-4 transition" href="#" @click.prevent="tab = 'register'"
                                :class="{
                                    'hover:text-white text-white bg-blue-600': tab === 'register',
                                    'hover:text-blue-600': tab === 'login'
                                }">Register</a>
                        </li>
                    </ul>

                    <!-- Login Form -->
                    <vee-form :validation-schema="loginSchema" @submit="login">
                        <!-- Email -->
                        <div class="mb-3">
                            <label class="inline-block mb-2">Email</label>
                            <input type="email"
                                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                                placeholder="Enter Email" />
                        </div>
                        <!-- Password -->
                        <div class="mb-3">
                            <label class="inline-block mb-2">Password</label>
                            <input type="password"
                                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                                placeholder="Password" />
                        </div>
                        <button type="submit"
                            class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700">
                            Submit
                        </button>
                    </vee-form>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from "pinia";
import useUserStore from "@/stores/user";

export default {
    name: "LoginForm",
    data() {
        return {
            tab: "login",
            schema: {
                name: "required|min:3|max:100|alpha_spaces",
                email: "required|min:3|max:100|email",
                age: "required|min_value:18|max_value:100",
                password: "required|min:9|max:100|excluded:password",
                confirm_password: "passwords_mismatch:@password",
                country: "required|country_exclude:Antarctica",
                tos: "tos"
            },
            userData: {
                country: 'USA',
            },
            login_in_submission: false,
            login_show_alert: false,
            login_alert_variant: 'bg-blue-500',
            login_alert_msg: "Please wait! Your account is being created."
        }
    },
    // computed: {
    //     ...mapState(useModalStore, ["hiddenClass"]),
    //     ...mapWriteableState(useModalStore, {
    //         modalVisibility: "isOpen"
    //     }),
    // },
    methods: {
        ...mapActions(useUserStore,["authenticate"]),
        async login(values) {
            this.login_show_alert = true;
            this.login_in_submission = true;
            this.login_alert_variant = "bg-blue-500";
            this.login_alert_msg = "Please wait! Your account is being created.";
            
            try{
                await this.authenticate(values);
            }catch(error){
                this.login_in_submission = false;
                this.login_alert_variant = 'bg-red-500';
                this.login_alert_msg = "Invalid login details";
                return;
            }

            this.login_alert_variant = "bg-green-500";
            this.login_alert_msg = "Success! Your account has been created",
            window.location.reload();
        }
    }
}
</script>