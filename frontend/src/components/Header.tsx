
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "./ui/menubar";
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Buttoncomp } from "./Buttoncomp";


const Header = () => {

  const drawerArray = ["Home", "Shorts", "Subscriptions", "Library", "History", "Your Videos", "Watch Later", "Liked Videos", "Show More"]

    return (
        <div >
        <Menubar className="p-8 flex justify-between">
            <div className="flex items-center">
            <div className=" drawer dark:">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer" className="btn bg-transparent border-none drawer-button"><img src='/hamburger.png' className='w-4' style={{ filter: 'invert(1)' }} /></label>
              </div>
              <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4 pt-14 text-gray-200">
                  {/* Sidebar content here */}
                  {drawerArray.map((item, index) => (
                    <li key={index}><a>{item}</a></li>
                  ))}
                </ul>
              </div>
            </div>
              <img src='/youtube.png' className=' w-8 m-2'/>
              <h3 className=' font-bold font-sans'>TubeTweet</h3>
            </div>
    
          <div className="flex w-96 max-w-sm items-center space-x-2 ml-100 pl-135px">
            <Input type="text" placeholder="Search" className="w-96" />
            <Button type="submit" className=" bg-gray-800 ml-0" >🔍</Button>
          </div>
          <div className="w-48 flex justify-evenly">
            <Buttoncomp props='Login' />
            <Buttoncomp props='SignUp' type='secondary' />
          </div>
          {/* <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar> */}
        </Menubar>
        </div>
      )
}

export default Header