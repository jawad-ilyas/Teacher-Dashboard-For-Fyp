import Header from "../components/Header";
import SearchFilter from "../components/SearchFilter";
import CardSection from "../components/CardSection";

const Dashboard = () => {
    return (
        <div className="min-h-screen ">
            <Header />
            <main className="container mx-auto mt-4 px-4">
                <SearchFilter />
                <CardSection />
            </main>
        </div>
    );
};

export default Dashboard;
