//components/Loader.jsx
import 'ldrs/ring'

export default function Loader(){

    return (
        <>
          <div className='loader' aria-live="polite">  {/* aria-live x people screen readers */}
            <l-ring size='60' color="coral"></l-ring>
          </div>
        </>
    );
}