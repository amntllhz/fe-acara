import { ReactNode } from "react";
import PageHead from "../../commons/PageHead"

interface PropTypes {
    title?: string,
    children: ReactNode
}

const AuthLayout = (props: PropTypes) => {
    const { title } = props;
    return (
        <>  
            <div className="flex justify-center items-center min-h-screen"> 
                <PageHead title={title}/>
                <section className="max-w-3xl">
                    {props.children}
                </section>
            </div>
        </>
    )
}

export default AuthLayout