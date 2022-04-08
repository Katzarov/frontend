import { ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import * as React from 'react'
import CustomListItem from './CustomListItem'
import { useRouter } from 'next/router'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  open: {
    marginTop: '25px',
    marginLeft: '155px',
  },
  close: {
    marginTop: '45px',
    marginLeft: '45px',
  },
})
type Props = {
  isOpen: boolean
  menu: string
  submenu: submenu
  icon: React.ElementType
}
type submenu = {
  label: string
  icon: React.ElementType
  href: string
}[]
export default function HoverMenu({ menu, submenu, icon: Icon, isOpen }: Props) {
  const router = useRouter()
  const classes = useStyles()
  const [anchorMenu, setAnchorMenu] = React.useState<null | HTMLElement>(null)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorMenu(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorMenu(null)
  }

  return (
    <>
      <ListItemButton onClick={handleOpenMenu}>
        <ListItemIcon title={menu}>{<Icon />}</ListItemIcon>
        <ListItemText primary={menu} />
        {anchorMenu ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </ListItemButton>
      <Menu
        className={isOpen ? classes.open : classes.close}
        id="menu-appbar"
        anchorEl={anchorMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorMenu)}
        onClose={handleCloseMenu}>
        {submenu.map(({ label, icon: Icon, href }, index) => (
          <MenuItem sx={{ p: 0 }} key={index} onClick={handleCloseMenu}>
            <CustomListItem
              key={label}
              selected={href !== '#' && router.asPath.includes(href)}
              icon={<Icon />}
              label={label}
              onClick={() => router.push(href)}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}