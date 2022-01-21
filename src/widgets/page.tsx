import { ICompBaseProps, ISchema } from "src/type"

export interface IPageProps extends ICompBaseProps {
  body: ISchema[]
}

function Page({body, render}: IPageProps){
  return(
    <div className="page">
      {render(body)}
    </div>
    )
}

export default Page
