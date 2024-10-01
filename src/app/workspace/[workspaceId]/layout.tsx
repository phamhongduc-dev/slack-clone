import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import Sidebar from './sidebar'
import Toolbar from './toolbar'
import WorkspaceSidebar from './workspace-sidebar'

interface WorkspaceLayoutProps {
  children: React.ReactNode
}

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  return (
    <div className=' h-full'>
      <Toolbar />
      <div className='flex h-[calc(100vh-40px)]'>
        <Sidebar />
        <ResizablePanelGroup direction='horizontal' autoSaveId='ca-workspace-layout'>
          <ResizablePanel defaultSize={20} minSize={11} className='bg-[#5e2c5f]'>
            <WorkspaceSidebar />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize={20}>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
