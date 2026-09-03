import { supabase } from "../supabase-client";
import type { NewRequest, NewUser } from "../types/database";

export const pairService = {
    async pairById(user_id:string): Promise<string | null>{
        const {data, error} = await supabase
        .from('users')
        .select('pair_id')
        .eq("user_id",user_id)
        .maybeSingle();

        if(error) { 
            console.error("error pairing: ", error.message);
            return null;
        }   

        return data ? data.pair_id : null;
    },
    async getPairId(user_id:string): Promise<string | null>{
        const {data,error} = await supabase
        .from('pairs')
        .select('id')
        .eq('status', 'accepted')
        .or(`sender.eq.${user_id},receiver.eq.${user_id}`)
        .maybeSingle();

        if(error) console.error("error getting pair id: ", error.message);

        return data ? data.id : null;
    },
    async sendPairRequest(newRequest:NewRequest) {
        const {data, error} = await supabase
        .from("pairs")
        .insert(newRequest)
        .select()
        .single();

        if(error) console.error("error sending request: ", error.message);

        return data;
    },
    async getRequests(user_id:string): Promise<NewRequest[]> {
        const {data, error} = await supabase
        .from("pairs")
        .select("*")
        .eq("status", "pending")
        .eq("receiver", user_id);

        if(error){
            console.error("error gettig reqeusts: ", error.message);
            throw error;
        }

        return data || [];
    },
    async acceptRequest(pair_id:string) {
        const {data, error} = await supabase
        .from('pairs')
        .update({status: 'accepted'})
        .eq('id', pair_id)
        .select()
        .single();

        if(error){
            console.error("error accepting request: ", error.message);
        }

        return data;
    },
    async getUserById(user_id:string): Promise<NewUser | null>{
        const{data, error} = await supabase
        .from("users")
        .select("*")
        .eq("user_id", user_id)
        .single();

        if(error) console.error("error getting user: ", error.message);

        return data ?? null;
    },
    async pair(user_id:string, pair_id:string){
        const { data:pairData, error:pairError } = await supabase
        .from('users')
        .update({pair_id:pair_id})
        .eq('user_id', user_id)
        .select()
        .single();

        if(pairError) {
            console.error("can't pair: ", pairError.message);
            return;
        }

        const {data:secondPairData, error:secondPairError} = await supabase
        .from('users')
        .update({pair_id:user_id})
        .eq("user_id", pair_id)
        .select()
        .single();

        if(secondPairError){
            console.error("error pairing: ", secondPairError.message);
            return;
        }

        return pairData && secondPairData;
    }
}