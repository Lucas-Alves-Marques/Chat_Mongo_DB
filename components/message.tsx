export default function Message({ User, MessageUser }: MessageParams) {

    return (

        <div className={`flex gap-2 w-full ${MessageUser && 'justify-end'} items-start p-4`}>

            <div className={`w-12 h-12 flex items-center justify-center font-bold bg-[#01291f] text-white text-xl rounded-full ${MessageUser && "hidden"}`}>

                <p>{User.usuario.charAt(0)}</p>

            </div>
            <div className="flex flex-col gap-1">

                <p className={`uppercase text-[#01291f] font-semibold text-sm ${MessageUser && "hidden"}`}>{User.usuario}</p>
                <div className={`flex gap-2 flex-col p-2 rounded-b-md ${MessageUser
                    ? 'rounded-tl-xl bg-green-700/30 text-gray-800'
                    : 'rounded-tr-xl bg-gray-300'}`}>

                    <p className="font-semibold">{User.message}</p>
                    <p className="text-sm">{User.data_hora}</p>

                </div>

            </div>
            <div className={`w-12 h-12 flex items-center justify-center font-bold bg-[#01291f] text-white text-xl rounded-full ${!MessageUser && "hidden"}`}>

                <p>{User.usuario.charAt(0)}</p>

            </div>

        </div>

    );

};