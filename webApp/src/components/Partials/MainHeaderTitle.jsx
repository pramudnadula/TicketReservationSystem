/* eslint-disable react/destructuring-assignment */
export default function MainHeaderTitle(props) {
    return (
        <div className="d-flex flex-column">
            <div className="text-center">
                <div className="display-5" style={{ color: "#7a25a5" }}>
                    <b>{props.title}</b>
                </div>
                <div className="shape">
                    <svg
                        width="172"
                        height="29"
                        viewBox="0 0 172 29"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1 5.08742C17.6667 19.0972 30.5 31.1305 62.5 27.2693C110.617 21.4634 150 -10.09 171 5.08727"
                            stroke="#D5C0ED"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
