import type { NewMessage } from "../types/database";
import { supabase } from "../supabase-client";

export const messageService = {
    async createMessage(newMessage:NewMessage): Promise<NewMessage>{
        const {data, error} = await supabase
        .from("messages")
        .insert(newMessage)
        .select()
        .single();

        if(error) console.error("error adding message: ", error.message);

        return data;
    },
    async getMostRecentMessage(pair_id: string): Promise<NewMessage>{
        const {data, error} = await supabase
        .from("messages")
        .select('*')
        .eq("from", pair_id)
        .order('created_at', {ascending: false})
        .limit(1)
        .maybeSingle();

        if(error) console.error("error getting most recent message: ", error.message);

        return data;
    },
    async uploadImage(file: File, pair_id: string): Promise<string>{
        const fileExt = file.name.split(".").pop();
        const filePath = `${pair_id}/${Date.now()}.${fileExt}`;

        const {error:uploadError} = await supabase.storage
        .from('chat-images')
        .upload(filePath, file);

        if(uploadError) console.error("error uploading image: ", uploadError.message);

        const {data} = supabase.storage
        .from('chat-images')
        .getPublicUrl(filePath);

        return data.publicUrl;
    }
};