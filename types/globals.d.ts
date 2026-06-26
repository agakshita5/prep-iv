// Augment Clerk's types so `sessionClaims.metadata.role` and `user.publicMetadata.role` are strongly typed everywhere.
export {};

type Role = "candidate" | "recruiter";

declare global {
  // Read from the session JWT: `(await auth()).sessionClaims?.metadata?.role`
  interface CustomJwtSessionClaims {
    metadata?: {
      role?: Role;
    };
  }

  // Read from the user record: `(await currentUser())?.publicMetadata.role`
  interface UserPublicMetadata {
    role?: Role;
  }
}
