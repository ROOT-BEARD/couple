import { Button, Card, Input, Typography } from "@heroui/react";
import { accountService } from "../services/accountService";
import type { NewAccount, NewRequest } from "../types/database";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContexts";
import SigninLogin from "../components/SigninLogin";
import { pairService } from "../services/pairSercive";
import { LogOut, SendHorizonal } from "lucide-react";


export default function AccountPage(){
    const { user, isLoading } = useUser();
    const [ signInInfo, setSignInInfo ] = useState<NewAccount>({email:'',username:'',password:''});
    const [ pairUsername, setPairUsername ] = useState<string>('');
    const [ requests, setRequests ] = useState<NewRequest[]>([]);
    const [ paired, setPaired ] = useState<boolean>(false);
    const [ username, setUserName ] = useState<string|null>('');

    useEffect(()=>{
        if (isLoading || !user?.id) return;
        handleGetPairedStatus();
        handleGetRequests();
        handleGetUsername();
    },[user?.id, isLoading]);

    const handleSignUp = async() =>{
        const newAccount:NewAccount={
            email:signInInfo.email,
            username:signInInfo.username,
            password:signInInfo.password
        };
        accountService.createAccount(newAccount);
    }

    const handleSignOut = async() =>{
        accountService.signOut();
    };

    const handleSignIn = async() =>{
        accountService.signIn(signInInfo.email,signInInfo.password);
    };

    const handleSendReqeust = async() =>{
        if(!user) return;

        const receiver_id = await accountService.idByUsername(pairUsername);

        if(receiver_id)
        {
            const request:NewRequest = {
                sender: user.id,
                receiver: receiver_id
            };

            await pairService.sendPairRequest(request);
        }
    };

    const handleAcceptingRequest = async(index:number) => {
        if(!user?.id){
            return;
        }
        if(requests[index].id){
            await pairService.acceptRequest(requests[index].id);
            handleGetRequests();
        }

        handleGetPairedStatus();
        handleGetRequests();
    };

    const handleGetUsername = async() => {
        if(!user?.id) return;

        const foundUsername = await pairService.getUsernameById(user.id);
        setUserName(foundUsername);
    }

    const handleGetRequests = async() =>{
        if(!user?.id){
            return;
        }
        const curRequests = await pairService.getRequests(user.id);
        setRequests(curRequests);
    };

    const handleGetPairedStatus = async() => {
        if(!user?.id){
            return;
        }
        const data = await pairService.getPairId(user.id);
        setPaired(Boolean(data));
    };

    const requestRender = () => {
        return(
            requests.map((request, index)=>(
                <div key={request.id || index}>
                    {request.sender}
                    <Button onClick={()=>handleAcceptingRequest(index)}> ACCEPT </Button>
                </div>
            ))
        );
    }

    return(
        <div className="flex h-screen items-center justify-center pb-30">
            {!user?<SigninLogin
                    setSignInInfo={setSignInInfo}
                    signInInfo={signInInfo}
                    handleSignUp={handleSignUp}
                    handleSignIn={handleSignIn}
            />:
            <div className="flex flex-col w-3/4 h-1/2">
                <Card className="flex h-full w-full" variant="secondary">
                    <div>
                        <Typography type="h4">Hello {username}</Typography>
                    </div>
                    {!paired?<div className="flex flex-col gap-3 w-full">
                    <Input placeholder="enter couple's username..." onChange={(e) => setPairUsername(e.target.value)}></Input>
                    <Button className="flex self-end" variant="outline" onClick={handleSendReqeust}><SendHorizonal/></Button>
                    <Card className="max-h-36 md:max-h-80 overflow-y-auto overflow-x-hidden">
                        {requestRender()}
                    </Card>
                    </div>:<></>}
                    <div className="flex justify-center items-center w-full h-full">PAIRED WITH {}</div>
                    <div className='flex w-full h-full justify-end items-end'>
                        <Button variant='danger-soft' onDoubleClick={handleSignOut}>Log out<LogOut/></Button>
                    </div>
                </Card>
            </div>}
        </div>
    );
}