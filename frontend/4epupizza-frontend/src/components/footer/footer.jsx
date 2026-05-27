import './footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-logo">
                    <img src="/img/4epupizza.png" alt="4epupizza" />
                </div>

                <div className="footer-phone">
                    +380 67 315 27 24
                </div>

                <div className="footer-socials">
                    <a href="#" aria-label="Instagram">
                        <img src="/img/instagram.svg" alt="" />
                    </a>
                    <a href="#" aria-label="Twitter">
                        <img src="/img/x.svg" alt="" />
                    </a>
                    <a href="#" aria-label="Facebook">
                        <img src="/img/facebook.svg" alt="" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
