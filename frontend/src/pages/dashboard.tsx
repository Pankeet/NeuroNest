//import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '../Components/ui/Button'
import { PlusSvg } from '../Components/icons/plus';
import { ShareSvg } from "../Components/icons/share";
import { Card } from '../Components/ui/Card';
import { CreateContent } from '../Components/ui/Content';
import { SideBar } from '../Components/ui/Sidebar';
import { useContent } from '../hooks/useContent';
import { useNavigate } from 'react-router-dom';
function DashBoard() {
  const [modelOpen,setOpen] = useState(false);
  const contents = useContent();
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
      nav('/login')
    }
  });
  return (
    <div className='font-serif'>
      <div>
        <SideBar />
        <div className='p-4 ml-64 min-h-screen bg-gray-100'>
          <CreateContent open={modelOpen} onClose={() => {setOpen(false)}} />
          <div className='flex justify-end gap-3'>
            <Button startingIcon={<ShareSvg size="sm" />} variant="secondary" text='Share Brain' size="md"/>
            <Button startingIcon={<PlusSvg size="sm" />} variant='primary' text='Add Content' size='md' onClick={()=>setOpen(true)}/>
          </div>
          <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-5'>
            {contents.map(({type , link , title , description}) => <Card type={type} description={description} title={title} link={link} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard;
