import { useState } from "react";
import SobreIntro from "./page/SobreIntro";
import Invitacion from "./page/Invitacion";

export default function App() {
  const [showInvitation, setShowInvitation] = useState(false);

  return (
    <>
      {!showInvitation ? (
        <SobreIntro onFinish={() => setShowInvitation(true)} />
      ) : (
        <Invitacion />
      )}
    </>
  );
}