import type { NewAccount, NewUser } from "../types/database";
import { supabase } from "../supabase-client";

export const accountService = {
    async createAccount(newAccount:NewAccount) {
        const {data:signUpData, error:signUpError} = await supabase.auth.signUp({
            email:newAccount.email,
            password:newAccount.password,
            options: {
                data:{
                    username: newAccount.username
                }
            }
        });
        if(signUpError){
            console.error("error adding account", signUpError.message);
            return;
        }

        const newUser:NewUser = {
            username: newAccount.username,
            user_id: signUpData.user?.id ?? '',
        };

        const {data:userTableData, error:userTableError} = await supabase
        .from("users")
        .insert(newUser)
        .single();

        if(userTableError){
            console.error("error adding user to table: ", userTableError.message);
            return;
        }

        return signUpData && userTableData;
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
    async idbyPairCode(pair_code:number): Promise<string | null>{
        const {data, error} = await supabase
        .from('users')
        .select('user_id')
        .eq("pair_code",pair_code)
        .maybeSingle();

        if(error) { 
            console.error("error pairing: ", error.message);
            return null;
        }   

        return data ? data.user_id : null;
    }
};