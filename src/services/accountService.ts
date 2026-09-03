import type { NewAccount } from "../types/database";
import { supabase } from "../supabase-client";

export const accountService = {
    async createAccount(newAccount:NewAccount) {
        const {data, error} = await supabase.auth.signUp({
            email:newAccount.email,
            password:newAccount.password,
            options: {
                data:{
                    username: newAccount.username
                }
            }
        });
        if(error) console.error("error adding account", error.message);
        return data;
    },
    async signOut(){
        const { error } = await supabase.auth.signOut();
        if(error) console.error("ERROR SIGNING OUT", error.message);
    },
    async signIn(email:string,password:string){
        const { error } = await supabase.auth.signInWithPassword({
            email:email,
            password:password
        });
        if(error) console.error("ERROR SIGNING IN", error.message);
    },
    async pair(user_id:string, pair_id:string){
        const { data, error } = await supabase
        .from('users')
        .update({pair_id:pair_id})
        .eq('user_id', user_id)

        if(error) console.error("can't pair: ", error.message);

        return data;
    },
    async idByUsername(username:string): Promise<string | null>{
        const {data, error} = await supabase
        .from('users')
        .select('user_id')
        .eq("username",username)
        .maybeSingle();

        if(error) { 
            console.error("error pairing: ", error.message);
            return null;
        }   

        return data ? data.user_id : null;
    }
};