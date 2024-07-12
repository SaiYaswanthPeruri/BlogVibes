import conf from '../conf/conf.js';
import {Client,Account,ID} from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);

    }

    async createAccount({email,password,name}){
        try {
            //   create used to create account
            const useAccount = await this.account.create(ID.unique(),email,password,name);
            if(useAccount){
                //  to the account
                return this.login({email,password});
            }else{
                return useAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
            // check this if error createEmailPasswordSession
            return await this.account.createEmailSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error",error);
        }
        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error",error);
        }
    }
}

const authService = new AuthService();

export default authService;