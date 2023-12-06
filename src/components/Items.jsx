export const Items = ({ currentItems }) => {
    <>
        {currentItems &&
            currentItems.map((item) => (
                <div key={item}>
                    <h3>Item #{item}</h3>
                </div>
            ))}
    </>
}