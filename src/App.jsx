import { useState } from "react";
import SobreIntro from "./page/SobreIntro";
import InvitacionBodaShelyAndre from "./page/Invitacion";

export default function App() {
  const [showInvitation, setShowInvitation] = useState(false);

  return !showInvitation ? (
    <SobreIntro onAnimationComplete={() => setShowInvitation(true)} />
  ) : (
    <InvitacionBodaShelyAndre />
  );
}