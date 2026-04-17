import { ReactNode } from "react";
import PageHead from "../../commons/PageHead"

interface PropTypes {
    children: ReactNode,
    title?: string
}

const AuthLayout = (props: PropTypes) => {
    const { children ,title } = props;
    return (
        <>  
            <div className="flex justify-center items-center min-h-screen"> 
                <PageHead title={title}/>
                <section className="max-w-3xl">
                    {children}
                </section>
            </div>
        </>
    )
}

export default AuthLayout