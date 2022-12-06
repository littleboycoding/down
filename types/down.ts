declare global {
  /**
   * Listen to Down event
   */
  var listen: <P>(eventName: string, cb: (payload: P) => void) => Cleanup;
  /**
   * Select file via dialog
   */
  var selectFile: () => Promise<File>;
  /**
   * Read file from given path
   */
  var readFile: (path: string) => Promise<File>;
  /**
   * Watch for file changed
   */
  var watch: (path: string) => Promise<void>;
  /**
   * Unwatch all files
   */
  var unwatch: () => Promise<void>;
}

type Cleanup = () => void;

export interface File {
  path: string;
  content: string;
}
