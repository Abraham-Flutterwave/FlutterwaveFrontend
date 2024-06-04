<?php

function generate_checkout_hash( array $data ): string {
    // format: sha256(amount+currency+customeremail+txref+sha256(secretkey)).
    $complete_hash = '';
    foreach ( $data as $key => $value ) {
        if ( 'secret_key' === $key ) {
            $complete_hash .= hash( 'sha256', $value );
        } else {
            $complete_hash .= $value;
        }
    }
    return hash( 'sha256', $complete_hash );
}


echo generate_checkout_hash([
    'amount' => 200,
    'currency' => 'NGN',
    'email' => 'johndoe@example.com',
    'tx_ref' => 'titanic-5394759348934985rdj',
    'secret_key' => 'FLWSECK-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX-X'
]);