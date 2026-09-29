---
title: "Digital Certificates and PKI Explained for Developers"
pubDate: 2026-08-31
description: "A practical introduction to Public Key Infrastructure: certificates, certificate authorities, trust chains and digital signatures."
author: "Yainier Martínez Ruben"
authorImage: "/profile_new.webp"
image: "/blog/pki-cover.webp"
category: "Security"
tags: ["security", "pki", "certificates", "digital-signature"]
---

# Digital Certificates and PKI Explained for Developers

Every time you open a site over HTTPS, sign a document electronically or authenticate a service with mTLS, you rely on a **Public Key Infrastructure (PKI)**. After working on a PKI implementation and on platforms that depend on digital signatures, I realized many developers use certificates daily without a clear mental model of how they work. Let's fix that.

## Key pairs: the foundation

Everything starts with asymmetric cryptography. You generate a **key pair**:

- A **private key**, which you keep secret.
- A **public key**, which you can share with anyone.

What one key encrypts or signs, only the other can decrypt or verify. The problem is: how do I know a public key really belongs to who it claims? That is exactly what a PKI solves.

## Certificates: an identity card for a public key

A **digital certificate** (usually in X.509 format) binds a public key to an identity — a person, an organization, a domain or a device. It contains, among other things:

- The subject (who the certificate belongs to).
- The public key.
- The validity period.
- The allowed uses (signing, encryption, server authentication…).
- The **signature of the Certificate Authority** that issued it.

## Certificate Authorities and the chain of trust

A **Certificate Authority (CA)** is the entity that verifies identities and signs certificates. Trust is organized as a chain:

1. A **Root CA**, whose certificate is self-signed and kept offline under strict protection.
2. One or more **Intermediate CAs**, signed by the root, which issue certificates day to day.
3. The **end-entity certificates** used by people, servers and applications.

When validating a certificate, software walks up the chain until it reaches a root it already trusts. If any link is broken, expired or revoked, validation fails.

## Revocation: when something goes wrong

Private keys get lost or compromised. That is why a PKI must be able to **revoke** certificates before they expire, using:

- **CRLs** (Certificate Revocation Lists), published periodically.
- **OCSP**, a service that answers in real time whether a certificate is still valid.

A validation that doesn't check revocation is incomplete.

## Digital signatures in practice

Signing a document does not mean encrypting the whole document with your private key. The process is:

1. Compute a **hash** of the document.
2. Sign that hash with the private key.
3. Attach the signature and the certificate.

The verifier recomputes the hash, checks the signature with the public key in the certificate and validates the certificate's chain. The result guarantees **integrity**, **authenticity** and **non-repudiation**.

## Tips from the trenches

- **Protect private keys** with HSMs or, at least, well-secured keystores. Never commit them to a repository.
- **Automate renewal.** Expired certificates are one of the most common causes of production outages.
- **Use mature tools** such as EJBCA for running a CA instead of reinventing the wheel.
- **Define clear policies** (who can request what, for how long, with which validations) before writing code.

## Conclusion

PKI can look intimidating, but it rests on a few simple ideas: key pairs, certificates that bind them to identities and a chain of trust you can verify. Understanding them makes you a better engineer every time you touch authentication, signatures or HTTPS.
