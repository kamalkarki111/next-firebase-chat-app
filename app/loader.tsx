'use client'
import { LoaderContext } from "@/context/loader.context";
import { CircularProgress } from "@mui/joy";
import { useContext } from "react";

export default function Loader(){

  const LoaderService = useContext(LoaderContext);

  console.log(LoaderService.showLoader)

    return(<>{ LoaderService.showLoader &&
        <div style={{position:'absolute',height:'100%',width:'100%', top:'0%',opacity:0.9,background:'lightgreen'}}>
            <div style={{position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)'}}>
                <CircularProgress size="lg"/>
            </div>
        </div>
    }</>
    )
}