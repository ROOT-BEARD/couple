import { Link } from "react-router-dom";
import { UserRound, Mailbox, MessageCircleHeart } from 'lucide-react';
import { Card } from "@heroui/react";

export default function Footer(){
    return(
        <div className="fixed bottom-0 left-0 right-0 z-1">
            <Card variant='tertiary' className="flex flex-row p-12 justify-between w-full items-end">
                <Link to='/'><MessageCircleHeart /></Link>
                <Link to='/readPage'><Mailbox/></Link>
                <Link to='/account'><UserRound/></Link>
            </Card>
        </div>
    );
}