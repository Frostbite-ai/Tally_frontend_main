import clsx from "clsx";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { BsCursorFill } from "react-icons/bs";
import { BsFlagFill } from "react-icons/bs";
import useTyping from "react-typing-game-hook";
import useLeaderboard from "@/hooks/useLeaderboard";
import Tooltip from "@/components/Tooltip";
import { usePreferenceContext } from "@/context/Preference/PreferenceContext";

type TypingInputProps = {
  text: string;
  time: string;
} & React.ComponentPropsWithRef<"input">;

const TypingInput = React.forwardRef<HTMLInputElement, TypingInputProps>(
  ({ text, time }, ref) => {
    const [duration, setDuration] = useState(() => 0);
    const [isFocused, setIsFocused] = useState(() => false);
    const letterElements = useRef<HTMLDivElement>(null);
    const [timeLeft, setTimeLeft] = useState(() => parseInt(time));
    const [realTimeWpm, setRealTimeWpm] = useState(0); // Add state for real-time WPM

    const { createLeaderboardData } = useLeaderboard();

    const {
      preferences: { isOpen, zenMode, type },
    } = usePreferenceContext();

    // Using the useTyping hook from the react-typing-game-hook package
    const {
      // Destructuring states from the hook
      states: {
        charsState, // State of each character in the text
        currIndex, // Current index in the text that the user is supposed to type next
        phase, // Current phase of the typing test (e.g., not started, in progress, completed)
        correctChar, // Count of correctly typed characters
        errorChar, // Count of incorrectly typed characters
        startTime, // Timestamp when the typing test started
        endTime, // Timestamp when the typing test ended
      },
      // Destructuring actions from the hook
      actions: {
        insertTyping, // Function to insert a character that the user has typed
        deleteTyping, // Function to delete a character that the user has typed
        resetTyping, // Function to reset the typing test
        endTyping, // Function to end the typing test
      },
    } = useTyping(text, { skipCurrentWordOnSpace: false }); // Calling the hook with the text and an options object




    // State for margin, initially set to 0
    const [margin, setMargin] = useState(() => 0);

    // State for value, initially set to an empty string
    const [value, setValue] = useState(() => "");

    // Memoized position, recalculated only when currIndex changes
    const pos = useMemo(() => {
      // If there's a current index and letterElements is defined...
      if (currIndex !== -1 && letterElements.current) {
        // Get the HTML element for the current character
        const spanref: any = letterElements.current.children[currIndex];

        // Calculate left and top positions
        const left = spanref.offsetLeft + spanref.offsetWidth - 2;
        const top = spanref.offsetTop - 2;

        // If top is greater than 60, increment margin and halve top
        if (top > 60) {
          setMargin((margin) => margin + 1);
          return {
            left,
            top: top / 2,
          };
        }
        // Return calculated left and top
        return { left, top };
      } else {
        // Return default left and top if no current index or letterElements
        return {
          left: -2,
          top: 2,
        };
      }
    }, [currIndex]); // Dependency for useMemo

    // once the mode or time is changed
    useEffect(() => {
      setValue("");
      setMargin(0);
      setTimeLeft(parseInt(time));
      endTyping();
      resetTyping();
      setRealTimeWpm(0); // Reset real-time WPM when the text or time changes
    }, [text, time]);




    // handle timer to end the test
    useEffect(() => {
      const timerInterval = setInterval(() => {
        if (startTime) {
          setTimeLeft((timeLeft) => {
            if (timeLeft === 1) {
              clearInterval(timerInterval);
              endTyping();
            }
            return parseInt(time) - Math.floor((Date.now() - startTime) / 1000);
          });
        }
      }, 1000);
      if (phase === 2) {
        clearInterval(timerInterval);
      }
      return () => clearInterval(timerInterval);
    }, [startTime, phase]);



    // Add a new effect for updating real-time WPM
    useEffect(() => {
      let timeoutId: NodeJS.Timeout | undefined;
      if (phase === 1 && startTime) {
        // Only when typing is in progress
        const updateWpm = () => {
          const elapsedSec = (Date.now() - startTime) / 1000; // Calculate elapsed time
          const wpm = Math.round(((60 / elapsedSec) * correctChar) / 5); // Calculate real-time WPM
          setRealTimeWpm(wpm); // Update real-time WPM
          timeoutId = setTimeout(updateWpm, 1000);
        };
        updateWpm(); // Start the recursive function
      }
      return () => timeoutId && clearTimeout(timeoutId); // Clean up on unmount or when the dependencies change
    }, [phase, startTime, correctChar]); // correctChar added to dependencies




    // This useEffect hook is used to calculate the Words Per Minute (WPM) and create leaderboard data when the typing test ends.
    useEffect(() => {
      // If the phase is 2 (which could represent the end of the typing test) and both endTime and startTime are defined...
      if (phase === 2 && endTime && startTime) {
        // Calculate the duration of the typing test in seconds.
        const dur = Math.floor((endTime - startTime) / 1000);

        // Update the duration state variable with the calculated duration.
        setDuration(dur);

        // Create leaderboard data for the typing test.
        createLeaderboardData({
          // The user's name is retrieved from local storage, with a default value of "guest".
          name: localStorage?.getItem("nickname") || "guest",

          // The WPM is calculated as the number of correct characters typed divided by 5 (the average word length),
          // multiplied by 60 (to convert from characters per second to words per minute), and divided by the duration.
          wpm: Math.round(((60 / dur) * correctChar) / 5),

          // The original time limit of the typing test is included in the leaderboard data.
          time: parseInt(time),

          // The type of the test is included in the leaderboard data, with a default value of "easy".
          type: type || "easy",
        });
      }
      // If the phase is not 2 or endTime or startTime is not defined...
      else {
        // Reset the duration state variable to 0.
        setDuration(0);
      }
      // This hook is triggered when the phase, startTime, endTime, or ref changes.
    }, [phase, startTime, endTime, ref]);




    // This function is an event handler for keydown events.
    const handleKeyDown = (letter: string, control: boolean) => {
      // If the key pressed was the "Backspace" key...
      if (letter === "Backspace") {
        // Get a reference to the HTML element corresponding to the current character
        // that the user is supposed to type next in the typing test.
        const spanref: any = letterElements?.current?.children[currIndex];

        // Calculate the top position of this HTML element, subtracting 2 for some reason
        // (perhaps to adjust the position of the cursor or highlight in the typing test).
        const top = spanref?.offsetTop - 2;

        // If the top position is less than 0, return early.
        // This could be used to prevent the cursor or highlight from moving above the container element.
        if (top < 0) {
          return;
        }

        // Call the deleteTyping function to delete a character from the typing test.
        // The control argument could indicate whether a control key like Shift or Ctrl was also pressed.
        deleteTyping(control);
      }
      // If the key pressed was a printable character (i.e., its length is 1)...
      else if (letter.length === 1) {
        // Call the insertTyping function to insert the character into the typing test.
        insertTyping(letter);
      }
    };


    return (
      <div className="relative w-full max-w-[950px]">
        {zenMode && (
          <div
            className={clsx(
              "pointer-events-none fixed inset-0 z-30 h-screen w-screen bg-bg transition-opacity duration-200",
              { "opacity-0": !isFocused }
            )}
          ></div>
        )}

        <div className="flex flex-col -mt-8">
          <div className="flex justify-between items-center mb-1">
            <span className="timeleft z-40 text-4xl text-fg/80">
              {timeLeft}
            </span>
            <span className="text-sm text-fg">
              {(phase === 1
                ? realTimeWpm
                : Math.round(((60 / duration) * correctChar) / 5)) || 0}{" "}
              wpm
            </span>{" "}
          </div>

          <div className="progressbar flex-grow mb-4">
            <div className="h-2 w-full overflow-hidden rounded-lg bg-hl/40 xs:min-w-[350px]">
              <div
                className="h-full rounded-lg bg-fg transition-all duration-500"
                style={{
                  width: `${Math.min((correctChar / 500) * 100, 100)}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div
          className={clsx(
            "relative z-40 h-[140px] w-full text-2xl outline-none"
          )}
          onClick={() => {
            if (ref != null && typeof ref !== "function") {
              ref?.current?.focus();
            }
            setIsFocused(true);
          }}
        >
          <input
            type="text"
            className="absolute left-0 top-0 z-20 h-full w-full cursor-default opacity-0"
            tabIndex={1}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={value}
            onChange={(e) => {
              setValue((prev) => {
                if (prev.length > e.target.value.length) {
                  handleKeyDown("Backspace", false);
                } else {
                  handleKeyDown(e.target.value.slice(-1), false);
                }
                return e.target.value;
              });
            }}
            onKeyDown={(e) => {
              if (isOpen) {
                setIsFocused(false);
                return;
              }
              if (e.ctrlKey) return;
              if (
                ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(
                  e.key
                )
              )
                e.preventDefault();
            }}
          />
          <div
            className={clsx(
              "absolute -top-4 z-10 h-4 w-full bg-gradient-to-b from-bg transition-all duration-200",
              { "opacity-0": !isFocused }
            )}
          ></div>
          <div
            className={clsx(
              "absolute -bottom-1 z-10 h-8 w-full bg-gradient-to-t from-bg transition-all duration-200",
              { "opacity-0": !isFocused }
            )}
          ></div>
          <span
            className={clsx(
              "absolute z-20 flex h-full w-full cursor-default items-center justify-center text-base opacity-0 transition-all duration-200",
              { "text-fg opacity-100 ": !isFocused }
            )}
          >
            Click
            <BsCursorFill className="mx-2 scale-x-[-1]" />
            or press any key to focus
          </span>
          <div
            className={clsx(
              "absolute top-0 left-0 mb-4 h-full w-full overflow-hidden text-justify leading-relaxed tracking-wide transition-all duration-200",
              { "opacity-40 blur-[8px]": !isFocused }
            )}
          >
            <div
              ref={letterElements}
              style={
                margin > 0
                  ? {
                    marginTop: -(margin * 39),
                  }
                  : {
                    marginTop: 0,
                  }
              }
            >
              {text.split("").map((letter, index) => {
                const state = charsState[index];
                const color =
                  state === 0
                    ? "text-font"
                    : state === 1
                      ? "text-fg"
                      : "text-hl border-b-2 border-hl";
                return (
                  <span
                    key={letter + index}
                    className={`${color} ${state === 0 &&
                      index < currIndex &&
                      "border-b-2 border-hl text-hl"
                      }`}
                  >
                    {letter}
                  </span>
                );
              })}
            </div>
          </div>
          {isFocused ? (
            <span
              style={{
                left: pos.top < 0 ? -2 : pos.left,
                top: pos.top < 0 ? 2 : pos.top + 2,
              }}
              className={clsx("caret text-hl", {
                "-mt-[2px]": currIndex === -1,
                "animate-blink": phase === 0,
              })}
            >
              {phase === 2 ? (
                <div className="group relative z-40">
                  <Tooltip
                    className="bg-fg text-bg group-hover:translate-y-0 group-hover:opacity-100"
                    triangle="bg-fg"
                  >
                    You finished here.
                  </Tooltip>
                  <BsFlagFill className="-mb-[8px] text-fg" />
                </div>
              ) : (
                "|"
              )}
            </span>
          ) : null}
        </div>
        <div className="relative z-40 mt-4 flex w-full flex-col flex-wrap items-center justify-center gap-4 text-sm">
          {phase === 2 && startTime && endTime ? (
            <div className="grid grid-rows-3 items-center gap-4 rounded-lg px-4 py-1 text-xl font-bold sm:flex">
              <span className="text-4xl">
                {Math.round(((60 / duration) * correctChar) / 5)}
                <span className="text-base">WPM</span>
              </span>{" "}
              <span className="text-4xl">
                {duration}
                <span className="text-2xl">s</span>
              </span>
              <span className="relative text-4xl">
                {(((correctChar - errorChar) / (currIndex + 1)) * 100).toFixed(
                  2
                )}
                %
                <span className="absolute -bottom-4 right-1 text-sm">
                  ACCURACY
                </span>
              </span>
              <span className="relative text-4xl">
                {Math.min((correctChar / 500) * 100, 100).toFixed(2)}%
                <span className="absolute -bottom-4 right-1 text-sm">
                  COMPLETED
                </span>
              </span>
            </div>
          ) : null}
          <div className="flex gap-4"></div>
        </div>
      </div>
    );
  }
);

export default TypingInput;
