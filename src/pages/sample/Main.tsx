const Main = () => {
    const profile = import.meta.env.VITE_PROFILE;

    return (
        <>
            <h2>메인 - {profile}</h2>
            <ul>
                <li>일반 React : https://github.com/kdk1026/vite-react-base</li>
                <li>utils 참고 : https://github.com/kdk1026/vite-util</li>
            </ul>
        </>
    )
};

export default Main;