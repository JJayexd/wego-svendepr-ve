import mobileFooter from '../../assets/WeGoFooterMobile1.svg'
import desktopFooter from '../../assets/WeGoFooter1.svg'

export const Footer = () => {
    return (
        <footer className="mt-auto">
            <img src={mobileFooter} alt="" className="md:hidden"/>
            <img src={desktopFooter} alt="" className="hidden md:block m-auto"/>
        </footer>
    )
}