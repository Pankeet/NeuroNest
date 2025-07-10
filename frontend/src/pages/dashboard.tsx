//import axios from 'axios';
import { useState } from 'react';
import { Button } from '../Components/ui/Button'
import { PlusSvg } from '../Components/icons/plus';
import { ShareSvg } from "../Components/icons/share";
import { Card } from '../Components/ui/Card';
import { CreateContent } from '../Components/ui/Content';
import { SideBar } from '../Components/ui/Sidebar';
import { useContent } from '../hooks/useContent';
function DashBoard() {
  const [modelOpen,setOpen] = useState(false);
  const contents = useContent();

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
          <div className='flex flex-row gap-6'>
            {contents.map(({type , link , title , description}) => <Card type={type} description={description} title={title} link={link} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard;
