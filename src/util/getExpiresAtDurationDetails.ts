type DurationDetails = {
  days: number;
};

/**
 * When `expiresAt` is a small number (< 1000), it represents a duration in days
 * rather than a Unix timestamp. This helper encapsulates that guard and returns
 * the days count.
 */
const getExpiresAtDurationDetails = (
  expiresAt: number
): DurationDetails | null => {
  if (expiresAt < 1000) {
    return { days: expiresAt };
  }
  return null;
};

export default getExpiresAtDurationDetails;
