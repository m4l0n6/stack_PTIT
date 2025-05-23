import { Layout} from "antd";
import { Link, Outlet } from "umi";

const { Header, Content } = Layout;

export default function AuthLayout(): JSX.Element {
    return (
        <Layout className="min-h-screen">
            <Header className="flex items-center">
                <Link to="/" className="flex items-center">
                    <h1 className="text-white text-3xl">stack PTIT</h1>
                </Link>
            </Header>
            <Content className="flex justify-center items-center px-[50px]">
                <Outlet />
            </Content>
        </Layout>
    );
}