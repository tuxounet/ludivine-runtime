export class BasicError extends Error {
  static badQuery(who: string, what: string, which: string): BasicError {
    return new BasicError(400, `entrée ${what} ${which} invalide par ${who}`);
  }

  static notFound(who: string, what: string, which: string): BasicError {
    return new BasicError(
      404,
      `entrée ${what} ${which} introuvable quand demandé par ${who}`
    );
  }

  static alreadyExists(who: string, what: string, which: string): BasicError {
    return new BasicError(
      409,
      `entrée ${what} ${which} existe déja quand demandé par ${who}`
    );
  }

  static notImplementedYet(who: string, what: string): BasicError {
    return new BasicError(
      417,
      `${what} n'est pas implémenté pour le moment sur ${who}`
    );
  }

  constructor(readonly code: number, message: string) {
    super(message);
  }
}
