import { useState } from 'react';
import { Button } from '../Components/ui/Button'
import { PlusSvg } from '../Components/icons/plus';
import { ShareSvg } from "../Components/icons/share";
import { Card } from '../Components/ui/Card';
import { CreateContent } from '../Components/ui/Content';
import { SideBar } from '../Components/ui/Sidebar';
function DashBoard() {

  const [modelOpen,setOpen] = useState(false);
  return (
    <div className='font-serif'>
      <div>
        <SideBar />
        <div className='p-4 ml-64 min-h-screen bg-gray-100'>
          <CreateContent open={modelOpen} onClose={() => {setOpen(false)}} />
          <div className='flex justify-end gap-3'>
            <Button startingIcon={<ShareSvg size="sm" />} variant="secondary" text='Share Brain' size="md" />
            <Button startingIcon={<PlusSvg size="sm" />} variant='primary' text='Add Content' size='md' onClick={()=>setOpen(true)}/>
          </div>
          <div className='flex gap-6'>
            <Card type="youtube" link="https://www.youtube.com/watch?v=utCPBmXNez8" title="Trump" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard;
