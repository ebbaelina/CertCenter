import React, { useState, useEffect } from 'react';
import { IDSBadge } from "@inera/ids-react";

function CopyAlert() {

    return (
        <IDSBadge className="ids-mr-2 ids-ml-2" type="success">Kopierad till urklipp</IDSBadge>
    )

}
export default CopyAlert;