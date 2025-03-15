import React, { useEffect, useState, useRef } from "react"
import List from "@/components/List"
import Help from "@/components/Help"
import Config from "@/components/Config"
import Fetch from "@/components/Fetch"
import { useSettings } from "@/context/settings"
import { subscribe, unsubscribe } from "@/utils/event"
import { RunCommand } from "@/utils/command"

const Terminal = () => {
	const windowRef = useRef(null)
	const [commands, setCommands] = useState("list")
	const [windowHeight, setWindowHeight] = useState({})
	const { settings } = useSettings()

	useEffect(() => {
		if (settings.terminal.fixedHeight) {
			const clientHeight = windowRef.current.clientHeight
			setWindowHeight({
				height: clientHeight
			})
		}

		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				closeWindow()
			}
		}

		subscribe("command", (e) => setCommands(e.detail))
		document.addEventListener("keydown", handleKeyDown)
		return () => {
			unsubscribe("command", (e) => setCommands(e.detail))
			document.removeEventListener("keydown", handleKeyDown)
		}
		// eslint-disable-next-line
	}, [settings])

	const closeWindow = () => {
		RunCommand("list", settings)
	}

	const getWindow = () => {
		const cmd = commands[0]

		if (cmd === "help") {
			return <Help closeCallback={closeWindow} />
		} else if (cmd === "config" && commands.length >= 2) {
			return <Config commands={commands} closeCallback={closeWindow} />
		} else if (cmd === "fetch") {
			return <Fetch closeCallback={closeWindow} />
		} else {
			return <List />
		}
	}

	// 函数以根据列数确定终端宽度类
	const getTerminalWidthClass = (columnCount) => {
		switch (columnCount) {
			case 1:
				return "max-w-terminal-1"
			case 2:
				return "max-w-terminal-2"
			case 4:
				return "max-w-terminal-4"
			case 5:
				return "max-w-terminal-5"
			case 6:
				return "max-w-terminal-6"
			default:
				return "max-w-terminal-3" // 默认3列
		}
	}

	if (!settings) return null

	return (
		<div
			className={`absolute w-full h-fit inset-x-0 inset-y-0 m-auto shadow-lg rounded-terminal bg-window-color ${getTerminalWidthClass(
				settings.columnCount
			)} p-terminal ${settings.terminal.windowGlow && "window-glow"}`}
			style={windowHeight}
			ref={windowRef}>
			{getWindow()}
		</div>
	)
}

export default Terminal
