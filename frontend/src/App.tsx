import './App.css'
import { Button } from './Components/ui/Button'
import { PlusSvg } from './Components/icons/plus';
import { ShareSvg } from "./Components/icons/share";
import { Card } from './Components/ui/Card';
import { CreateContent } from './Components/ui/Content';
import { useState } from 'react';
import { SideBar } from './Components/ui/Sidebar';
function App() {

  const [modelOpen,setOpen] = useState(false);
  return (
    <div>
      <div>
        <SideBar />
        <div className='p-4 ml-64 min-h-screen bg-gray-200'>
          <CreateContent open={modelOpen} onClose={() => {setOpen(false)}} />
          <div className='flex justify-end gap-3'>
            <Button startingIcon={<PlusSvg size="md" />} variant='primary' text='Add Content' size='sm' onClick={()=>setOpen(true)}/>
            <Button startingIcon={<ShareSvg size="md" />} variant="secondary" text='Share Brain' size="md" />
          </div>
          <div className='flex gap-6'>
            <Card type="youtube" link="https://www.youtube.com/watch?v=utCPBmXNez8" title="Trump" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
